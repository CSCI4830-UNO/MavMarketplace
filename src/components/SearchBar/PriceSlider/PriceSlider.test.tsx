import { render, screen, fireEvent } from "@testing-library/react";
import PriceSlider from "./PriceSlider";

describe("PriceSlider component", () => {
  test("renders two slider thumbs for range mode", () => {
    render(
      <PriceSlider
        value={[100, 500]}
        onChange={() => {}}
        min={0}
        max={1000}
        step={10}
        valueLabelDisplay="auto"
      />
    );

    const sliders = screen.getAllByRole("slider");
    expect(sliders.length).toBe(2);
  });

  test("calls onChange when slider value changes", () => {
    const handleChange = vi.fn();

    render(
      <PriceSlider
        value={[200, 800]}
        onChange={handleChange}
        min={0}
        max={1000}
        step={10}
      />
    );

    const sliders = screen.getAllByRole("slider");
    const leftThumb = sliders[0];

    fireEvent.change(leftThumb, { target: { value: 300 } });

    expect(handleChange).toHaveBeenCalled();
  });
});
