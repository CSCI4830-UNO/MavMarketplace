import { signIn } from './authentication'
import { expect, test, vi, beforeEach } from 'vitest'
import { signInWithEmailAndPassword } from 'firebase/auth'

// mock Firebase modules
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
}))

vi.mock('../config/firebase', () => ({
  auth: { currentUser: null }
}))

beforeEach(() => {
  vi.clearAllMocks()
})

test('signIn should call Firebase with email and password', async () => {

  // mock data
  const mockEmail = 'student@unomaha.edu'
  const mockPassword = 'password123'
  const mockUser = { uid: 'test-uid-123', email: mockEmail }

  // setup mock to return fake user
  const mockSignIn = vi.mocked(signInWithEmailAndPassword)
  mockSignIn.mockResolvedValue({ user: mockUser } as any)

  const result = await signIn(mockEmail, mockPassword)

  //  Firebase was called correctly?
  expect(mockSignIn).toHaveBeenCalledTimes(1)
  expect(result.user.email).toBe(mockEmail)
  expect(result.user.uid).toBe('test-uid-123')
})
