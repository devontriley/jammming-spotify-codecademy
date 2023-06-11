import 'whatwg-fetch'
// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom'
import { server } from "./mocks/server"

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Cleanup after the tests are finished
afterAll(() => server.close())