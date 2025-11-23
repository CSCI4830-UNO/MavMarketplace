/**
 * Component render test template
 *
 * Setup (run once when you clone the repo):
 *   npm install           - installs all project dependencies
 *
 * Run tests:
 *   npm test              - starts vitest in watch mode
 *                           (automatically re-runs tests when files change)
 *   npm test -- --run     - runs tests once and exits
 *
 * Use:
 * 1. Copy this file and rename (i.e, Button.test.tsx)
 * 2. Import your component
 * 3. Update describe() and uncomment test code
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// import YourComponent from '../components/YourComponent';

/**
 * describe() - Groups related tests together
 * First argument: name of what you're testing
 * Second argument: function containing your tests
 */
describe('YourComponent', () => {
  /**
   * it() - Defines a single test case
   * First argument: description of what the test checks
   * Second argument: function with the test code
   */
  it('renders without crashing', () => {
    /**
     * render() - Renders your component into a virtual DOM
     * This simulates the component appearing on a webpage
     */
    // render(<YourComponent />);

    /**
     * screen.getByText() - Finds an element by its text content
     * If the element isn't found, the test fails
     */
    // const element = screen.getByText('Expected Text');

    /**
     * expect().toBeInTheDocument() - Checks if the element exists
     * If it doesn't exist, the test fails
     */
    // expect(element).toBeInTheDocument();
  });
});
