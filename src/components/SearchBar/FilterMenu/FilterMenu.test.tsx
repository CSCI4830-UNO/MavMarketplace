import { render, screen, fireEvent } from "@testing-library/react";
import { ListingPage } from "../../../pages/ListingPage";
import { listingMocks } from "../../../mock-data/listing-mocks";

vi.mock("../../../components/Listing", () => {
  return {
    default: (props: any) => <div data-testid="listing">{props.name}</div>,
  };
});

describe("FilterMenu + ListingPage integration", () => {
  test("renders the filter button that opens the drawer", () => {
    render(<ListingPage />);

    const filterButton = screen.getByRole("button", { name: /filter/i });
    expect(filterButton).toBeInTheDocument();

    fireEvent.click(filterButton);

    expect(screen.getByText(/filter listings/i)).toBeInTheDocument();
  });

  test("filters listings by location when checkboxes are used", () => {
    render(<ListingPage />);

    fireEvent.click(screen.getByRole("button", { name: /filter/i }));

    expect(screen.getAllByTestId("listing").length).toBe(listingMocks.length);

    const scottBox = screen.getByLabelText("Scott Village");
    fireEvent.click(scottBox);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const expected = listingMocks.filter((l) => l.location === "Scott Village");

    const rendered = screen.getAllByTestId("listing");
    expect(rendered.length).toBe(expected.length);

    rendered.forEach((node, i) => {
      expect(node).toHaveTextContent(expected[i].name);
    });
  });

  test("filters listings by payment method", () => {
    render(<ListingPage />);

    fireEvent.click(screen.getByRole("button", { name: /filter/i }));

    const venmoBox = screen.getByLabelText("Venmo");
    fireEvent.click(venmoBox);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const expected = listingMocks.filter((l) =>
      l.paymentType.includes("Venmo")
    );

    const rendered = screen.getAllByTestId("listing");

    expect(rendered.length).toBe(expected.length);
    rendered.forEach((node, i) => {
      expect(node).toHaveTextContent(expected[i].name);
    });
  });
});
