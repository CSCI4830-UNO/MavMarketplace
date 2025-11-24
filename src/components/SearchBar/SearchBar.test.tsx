import { render, screen, fireEvent } from "@testing-library/react";
import { ListingPage } from "../../pages/ListingPage";
import { listingMocks } from "../../mock-data/listing-mocks";

vi.mock("../../components/Listing", () => {
  return {
    default: (props: any) => <div data-testid="listing">{props.name}</div>,
  };
});

describe("SearchBar + ListingPage integration", () => {
  test("renders the search bar", () => {
    render(<ListingPage />);

    const input = screen.getByLabelText(/search listings/i);
    expect(input).toBeInTheDocument();
  });

  test("filters listings correctly when searching", () => {
    render(<ListingPage />);

    const input = screen.getByLabelText(/search listings/i);

    expect(screen.getAllByTestId("listing").length).toBe(listingMocks.length);

    fireEvent.change(input, { target: { value: "maverick" } });

    const expectedResults = listingMocks.filter((l) =>
      l.name.toLowerCase().includes("maverick")
    );

    const renderedListings = screen.getAllByTestId("listing");
    expect(renderedListings.length).toBe(expectedResults.length);

    renderedListings.forEach((node, i) => {
      expect(node).toHaveTextContent(expectedResults[i].name);
    });
  });
});
