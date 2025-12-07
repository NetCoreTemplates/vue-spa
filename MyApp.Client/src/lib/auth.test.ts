import { describe, it, expect } from 'vitest'
import { createAttrs } from './auth'

describe('auth utilities', () => {
  describe('createAttrs', () => {
    it('should return empty array for null auth', () => {
      const result = createAttrs(null)
      expect(result).toEqual([])
    })

    it('should return empty array for undefined auth', () => {
      const result = createAttrs(undefined)
      expect(result).toEqual([])
    })

    it('should return auth attr for authenticated user with no roles or permissions', () => {
      const result = createAttrs({})
      expect(result).toEqual(['auth'])
    })

    it('should include roles with role: prefix', () => {
      const result = createAttrs({
        roles: ['Admin', 'Manager']
      })
      expect(result).toEqual(['auth', 'role:Admin', 'role:Manager'])
    })

    it('should include permissions with perm: prefix', () => {
      const result = createAttrs({
        permissions: ['ReadData', 'WriteData']
      })
      expect(result).toEqual(['auth', 'perm:ReadData', 'perm:WriteData'])
    })

    it('should include both roles and permissions', () => {
      const result = createAttrs({
        roles: ['Admin'],
        permissions: ['ReadData', 'WriteData']
      })
      expect(result).toEqual(['auth', 'role:Admin', 'perm:ReadData', 'perm:WriteData'])
    })

    it('should handle empty roles and permissions arrays', () => {
      const result = createAttrs({
        roles: [],
        permissions: []
      })
      expect(result).toEqual(['auth'])
    })
  })
})
