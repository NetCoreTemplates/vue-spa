<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Slide {
    title: string;
    summary: string;
    image: string;
    url: string;
    path: string;
}

const slides: Slide[] = [
    {
        title: 'API Explorer',
        summary: 'A better Swagger UI alternative built into ServiceStack that lets you explore, discover & call your APIs',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/api-explorer.webp',
        url: 'https://docs.servicestack.net/api-explorer',
        path: '/ui',
    },
    {
        title: 'Locode',
        summary: 'Instant CRUD UI to manage all your App\'s back-end AutoQuery Tables',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/locode.webp',
        url: 'https://docs.servicestack.net/locode/',
        path: '/locode',
    },
    {
        title: 'AI Chat',
        summary: 'Simple and flexible AI integrations with ChatGPT-like UI with Admin Analytics UI',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/ai-chat.webp',
        url: 'https://docs.servicestack.net/ai-chat-api',
        path: '/admin-ui/chat',
    },
    {
        title: 'Admin UI Dashboard',
        summary: 'High-level overview stats on number and type of APIs and internal counters',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/dashboard.webp',
        url: 'https://docs.servicestack.net/admin-ui',
        path: '/admin-ui/',
    },
    {
        title: 'Analytics',
        summary: 'Comprehensive In Depth & Interactive API Analytics',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/analytics.webp',
        url: 'https://docs.servicestack.net/admin-ui-rdbms-analytics',
        path: '/admin-ui/analytics',
    },
    {
        title: 'IdentityAuth Users',
        summary: 'Customizable ASP.NET Core Identity Auth User Management',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/users.webp',
        url: 'https://docs.servicestack.net/admin-ui-identity-users',
        path: '/admin-ui/users',
    },
    {
        title: 'IdentityAuth Roles',
        summary: 'Manage App ASP.NET Core Identity Auth Roles and Claims',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/roles.webp',
        url: 'https://docs.servicestack.net/admin-ui-identity-roles',
        path: '/admin-ui/roles',
    },
    {
        title: 'API Keys',
        summary: 'Customizable, fine-grain and integrated API Key management',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/apikeys.webp',
        url: 'https://docs.servicestack.net/auth/apikeys',
        path: '/admin-ui/apikeys',
    },
    {
        title: 'Request Logging',
        summary: 'Rich, detailed, queryable and rolling Request Logs',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/logging.webp',
        url: 'https://docs.servicestack.net/admin-ui-profiling',
        path: '/admin-ui/logging',
    },
    {
        title: 'Profiling',
        summary: 'Observable, Diagnostic Source profiling event viewer',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/profiling.webp',
        url: 'https://docs.servicestack.net/admin-ui-profiling',
        path: '/admin-ui/profiling',
    },
    {
        title: 'Commands',
        summary: 'Use Commands as encapsulated building blocks for robust and observable systems',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/commands.webp',
        url: 'https://docs.servicestack.net/commands',
        path: '/admin-ui/commands',
    },
    {
        title: 'Background Jobs',
        summary: 'Effortless management of Background Jobs and Scheduled Tasks',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/backgroundjobs.webp',
        url: 'https://docs.servicestack.net/rdbms-background-jobs',
        path: '/admin-ui/backgroundjobs',
    },
    {
        title: 'DB Validation Rules',
        summary: 'Manage dynamic Type and Property Rule Validators',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/validation.webp',
        url: 'https://docs.servicestack.net/admin-ui-validation',
        path: '/admin-ui/validation',
    },
    {
        title: 'Database Browser',
        summary: 'Browse RDBMS tables of all App\'s configured databases',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/database.webp',
        url: 'https://docs.servicestack.net/admin-ui-database',
        path: '/admin-ui/database',
    },
    {
        title: 'Redis Admin',
        summary: 'Inspect, browse and modify the App\'s configured Redis instance',
        image: 'https://docs.servicestack.net/img/pages/admin-ui/carousel/redis.webp',
        url: 'https://docs.servicestack.net/admin-ui-redis',
        path:'/admin-ui/redis',
    }
]

defineProps<{
    className?: string
}>()

const currentIndex = ref(0)
const isAutoPlaying = ref(true)
const direction = ref<'left' | 'right'>('right')
let intervalId: number | null = null

const currentSlide = computed(() => slides[currentIndex.value] || slides[0])

const goToNext = () => {
    direction.value = 'right'
    currentIndex.value = (currentIndex.value + 1) % slides.length
}

const goToPrevious = () => {
    direction.value = 'left'
    currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
    direction.value = index > currentIndex.value ? 'right' : 'left'
    currentIndex.value = index
}

const handleMouseEnter = () => {
    isAutoPlaying.value = false
}

const handleMouseLeave = () => {
    isAutoPlaying.value = true
}

const startAutoPlay = () => {
    if (intervalId) clearInterval(intervalId)
    intervalId = window.setInterval(goToNext, 5000)
}

const stopAutoPlay = () => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

onMounted(() => {
    startAutoPlay()
})

onUnmounted(() => {
    stopAutoPlay()
})

// Watch for autoplay changes
const watchAutoPlay = () => {
    if (isAutoPlaying.value) {
        startAutoPlay()
    } else {
        stopAutoPlay()
    }
}

// Manually trigger watch effect
const unwatchAutoPlay = () => {
    watchAutoPlay()
}

// Watch isAutoPlaying changes
const prevIsAutoPlaying = ref(isAutoPlaying.value)
const checkAutoPlayChange = () => {
    if (prevIsAutoPlaying.value !== isAutoPlaying.value) {
        watchAutoPlay()
        prevIsAutoPlaying.value = isAutoPlaying.value
    }
    requestAnimationFrame(checkAutoPlayChange)
}
checkAutoPlayChange()

const getSlideClass = (index: number) => {
    if (index === currentIndex.value) {
        return 'opacity-100 translate-x-0'
    }
    
    if (direction.value === 'right') {
        return index < currentIndex.value ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
    } else {
        return index < currentIndex.value ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
    }
}
</script>

<template>
    <div :class="`relative overflow-hidden bg-white dark:bg-slate-900 pt-24 pb-40 ${className ?? ''}`">
    
        <!-- Background Decorative Elements (Glow effects) -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-30 pointer-events-none">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-blue-900/40 blur-3xl rounded-full" />
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">

            <!-- Main Title with Gradient -->
            <h1 class="max-w-4xl mx-auto mb-6 text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Built-in <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">UIs</span>
            </h1>

            <!-- Subtext -->
            <p class="max-w-3xl mx-auto mb-12 text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Manage your ServiceStack App, instantly explore, and query your APIs using 
                the built-in Auto UIs that's automatically generated from your App's typed C# DTOs.
            </p>
        </div>
        
        <!-- Image Carousel -->
        <div class="w-full">
            <div
                class="relative"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
            >
                <!-- URL Link -->
                <a
                    :href="currentSlide.path"
                    class="block mb-6 text-center group/link hover:opacity-80 transition-opacity"
                >
                    <div class="text-3xl font-mono">
                        <span class="text-blue-600 hover:text-blue-700 font-semibold">{{ currentSlide.path }}</span>
                    </div>
                </a>

                <!-- Main Carousel Container -->
                <div class="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-2xl overflow-hidden group border border-slate-300">
                    <!-- Image Container -->
                    <div class="relative aspect-[1704/1131] overflow-hidden bg-black/30">
                        <div
                            v-for="(slide, index) in slides"
                            :key="index"
                            :class="`absolute inset-0 transition-all duration-700 ease-in-out ${getSlideClass(index)}`"
                        >
                            <img
                                :src="slide.image"
                                :alt="slide.title"
                                class="w-full h-full object-cover"
                                :loading="index === 0 ? 'eager' : 'lazy'"
                            />
                        </div>

                        <!-- Navigation Arrows - Only show on hover -->
                        <button
                            type="button"
                            @click="goToPrevious"
                            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none backdrop-blur-sm opacity-0 group-hover:opacity-100 ring-1 ring-slate-300"
                            aria-label="Previous slide"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            @click="goToNext"
                            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none backdrop-blur-sm opacity-0 group-hover:opacity-100 ring-1 ring-slate-300"
                            aria-label="Next slide"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <!-- Content Section - Overlapping -->
                        <div class="absolute bottom-0 left-0 right-0 p-8 bg-black/80 backdrop-blur-sm">
                            <div class="flex items-center justify-between gap-6">
                                <div class="flex-1 min-w-0">
                                    <!-- Title with animation -->
                                    <div class="overflow-hidden mb-4">
                                        <h2
                                            :key="currentIndex"
                                            class="text-3xl font-bold text-white animate-[slideUp_0.5s_ease-out]"
                                        >
                                            {{ currentSlide.title }}
                                        </h2>
                                    </div>

                                    <!-- Summary with animation -->
                                    <div class="overflow-hidden">
                                        <p
                                            :key="`summary-${currentIndex}`"
                                            class="text-lg text-gray-200 animate-[slideUp_0.5s_ease-out_0.1s_both]"
                                        >
                                            {{ currentSlide.summary }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Learn More Button -->
                                <a
                                    :href="currentSlide.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex-shrink-0 ml-auto"
                                >
                                    <span>Learn More</span>
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dot Indicators with Navigation -->
                <div class="flex justify-center items-center gap-6 mt-8">
                    <!-- Left Navigation -->
                    <button
                        type="button"
                        @click="goToPrevious"
                        class="bg-white hover:bg-slate-50 text-slate-800 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110 focus:outline-none ring-1 ring-slate-300"
                        aria-label="Previous slide"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <!-- Dots -->
                    <div class="flex gap-3">
                        <button
                            v-for="(slide, index) in slides"
                            :key="index"
                            type="button"
                            @click="goToSlide(index)"
                            :class="`transition-all duration-300 rounded-full focus:outline-none ${
                                index === currentIndex
                                    ? 'w-12 h-3 bg-blue-600 shadow-lg'
                                    : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                            }`"
                            :aria-label="`Go to slide ${index + 1}`"
                            :aria-current="index === currentIndex ? 'true' : 'false'"
                        />
                    </div>

                    <!-- Right Navigation -->
                    <button
                        type="button"
                        @click="goToNext"
                        class="bg-white hover:bg-slate-50 text-slate-800 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110 focus:outline-none ring-1 ring-slate-300"
                        aria-label="Next slide"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
