import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreatePage } from "../pages/CreatePage";

describe("CreatePage Component", () => {

  it("renders the Create Listing form", () => {
    render(<CreatePage />);
    expect(screen.getByText("Create New Listing")).toBeInTheDocument();
  });

  it("shows an error if fields are empty on submit", () => {
    render(<CreatePage />);

    const submitBtn = screen.getByRole("button", { name: /create listing/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText("Please fill out all fields.")).toBeInTheDocument();
  });

  it("allows typing into form fields", () => {
    render(<CreatePage />);

    const nameInput = screen.getByPlaceholderText("Ex: UNO Hoodie");
    fireEvent.change(nameInput, { target: { value: "Test Item" } });

    const priceInput = screen.getByPlaceholderText("Ex: 25");
    fireEvent.change(priceInput, { target: { value: "10" } });

    expect(nameInput).toHaveValue("Test Item");
    expect(priceInput).toHaveValue(10);
  });

  it("uploads an image and shows a preview", () => {
    render(<CreatePage />);

    const file = new File(["test"], "test.png", { type: "image/png" });

    const uploadInput = screen.getByLabelText("Item Image");
    fireEvent.change(uploadInput, { target: { files: [file] } });

    const previewImage = screen.getByAltText("Preview");
    expect(previewImage).toBeInTheDocument();
  });

  it("submits successfully when all fields are filled", () => {
    render(<CreatePage />);

    // Fill in all fields
    fireEvent.change(screen.getByPlaceholderText("Ex: UNO Hoodie"), {
      target: { value: "Test Item" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ex: 25"), {
      target: { value: "30" },
    });

    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Scott Village" },
    });

    fireEvent.change(screen.getByLabelText("Payment Type"), {
      target: { value: "Cash" },
    });

    // Fake image
    const file = new File(["sample"], "sample.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText("Item Image"), {
      target: { files: [file] },
    });

    // Mock alert
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    // Submit form
    fireEvent.click(
      screen.getByRole("button", { name: /create listing/i })
    );

    expect(alertMock).toHaveBeenCalledWith("Listing Created Successfully!");

    alertMock.mockRestore();
  });
});
