import { ref, computed } from "vue"
import { acceptHMRUpdate, defineStore } from "pinia"
import { ResponseStatus } from "@servicestack/client"
import { client } from "@/api"
import { CreateTodo, DeleteTodo, DeleteTodos, QueryTodos, Todo, UpdateTodo } from "@/dtos"

export type Filter = "all" | "finished" | "unfinished"

export const useTodosStore = defineStore('todos', () => {
    // State
    const todos = ref<Todo[]>([])
    const newTodo = ref("")
    const filter = ref<Filter>('all')
    const error = ref<ResponseStatus|null>()

    // Getters
    const finishedTodos = computed(() => todos.value.filter(x => x.isFinished))
    const unfinishedTodos = computed(() => todos.value.filter(x => !x.isFinished))
    const filteredTodos = computed(() => filter.value == 'finished'
        ? finishedTodos.value
        : filter.value == 'unfinished'
            ? unfinishedTodos.value
            : todos.value)

    // Actions
    const refreshTodos = async (errorStatus?:ResponseStatus) => {
        error.value = errorStatus
        const api = await client.api(new QueryTodos())
        if (api.succeeded) {
            todos.value = api.response!.results ?? []
        }
    }
    const addTodo = async () => {
        todos.value.push(new Todo({ text: newTodo.value }))
        let api = await client.api(new CreateTodo({ text: newTodo.value }))
        if (api.succeeded)
            newTodo.value = ''
        await refreshTodos(api.error)
    }
    const removeTodo = async (id?: number) => {
        todos.value = todos.value.filter(x => x.id != id)
        let api = await client.api(new DeleteTodo({ id }))
        await refreshTodos(api.error)
    }
    const removeFinishedTodos = async () => {
        let ids = todos.value.filter(x => x.isFinished).map(x => x.id!)
        if (ids.length == 0) return
        todos.value = todos.value.filter(x => !x.isFinished)
        let api = await client.api(new DeleteTodos({ ids }))
        await refreshTodos(api.error)
    }
    const toggleTodo = async (id?: number) => {
        const todo = todos.value.find(x => x.id == id)!
        todo.isFinished = !todo.isFinished
        let api = await client.api(new UpdateTodo(todo))
        await refreshTodos(api.error)
    }
    const changeFilter = (value:Filter) => filter.value = value

    return {
        error,
        newTodo,
        filter,
        finishedTodos,
        unfinishedTodos,
        filteredTodos,
        refreshTodos,
        addTodo,
        removeTodo,
        removeFinishedTodos,
        toggleTodo,
        changeFilter,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot))
