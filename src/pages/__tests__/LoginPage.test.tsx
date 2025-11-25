import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../LoginPage";

//Acts as a wrpper for rendering the Loginpage for the tests
const renderWithRouter = () => {
    render(
    <MemoryRouter>
        <LoginPage />
    </MemoryRouter>
    );
};

//Sets the test suite for the LoginPage tests
describe("LoginPage Unit Tests", () => {

    //renders the LoginPage before each test to ensure it has a fresh state to check
    beforeEach(() => {
        renderWithRouter(); 
    })

    //Checks to make sure major components of the login page are rendered properly.
    it("renders all login form elements", () => {
        expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /sign in/i })
        ).toBeInTheDocument();
    });

    //Checks to make sure that an error message is shown if submission is attempted with empty fields.
    it("shows error when fields are empty", async () => {
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        await waitFor(() => {
            expect(
            screen.getByText(/Please fill in all fields./i)
            ).toBeInTheDocument();
        });
    });

    //Checks to make sure that the error message is displayed when invalid credentials are used.
    it("shows incorrect password/email message if login fails(too many failed attempts voids this)", async () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole("button", { name: /sign in/i });

        await userEvent.type(emailInput, "bad@unomaha.edu");
        await userEvent.type(passwordInput, "wrongpass");
        await userEvent.click(submitButton);

        await waitFor(() => {
            // Your component should display an error message for invalid login
            expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
        });
    });
    
    //Checks to make sure that if a login fails, some sort of error message is shown (either wrong passowrd/email or too many attempts)
    it("shows any error message if login fails", async () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole("button", { name: /sign in/i });

        await userEvent.type(emailInput, "bad@unomaha.edu");
        await userEvent.type(passwordInput, "wrongpass");
        await userEvent.click(submitButton);

        await waitFor(() => {
            // Your component should display an error message for invalid login
            expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
        });
    });

    // Verify that a loading state is started when signin is called (disables the button so spamming can't occur)
    it("disables submit button while signing in", async () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole("button", { name: /sign in/i });

        await userEvent.type(emailInput, "some@email.com");
        await userEvent.type(passwordInput, "password");
        await userEvent.click(submitButton);

        // Check if button is disabled or shows "Signing In..."
        expect(submitButton).toBeDisabled();
    });
});
