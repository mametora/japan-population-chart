import { render, screen, fireEvent } from "@testing-library/react";
import PrefectureSelect from "@/app/_components/PrefectureSelect";

describe("PrefectureSelect", () => {
  const prefectures = [
    { id: 1, name: "北海道" },
    { id: 13, name: "東京都" },
  ];

  it("都道府県のチェックボックスが表示される", () => {
    render(
      <PrefectureSelect
        prefectures={prefectures}
        selectedPrefectureIds={[]}
        setSelectedPrefectureIds={jest.fn()}
      />,
    );
    expect(screen.getByLabelText("北海道")).toBeInTheDocument();
    expect(screen.getByLabelText("東京都")).toBeInTheDocument();
  });

  it("チェックボックスをクリックするとsetSelectedPrefectureIdsが呼ばれる", () => {
    const setSelected = jest.fn();
    render(
      <PrefectureSelect
        prefectures={prefectures}
        selectedPrefectureIds={[]}
        setSelectedPrefectureIds={setSelected}
      />,
    );
    fireEvent.click(screen.getByLabelText("北海道"));
    expect(setSelected).toHaveBeenCalled();
  });
});
