"use client";

import {
  PageHeadingTitle,
  SelectionBox,
  ApparelPurchaseListTable,
  OtherPurchaseListTable,
} from "@/components";
import { purchaseTypes } from "@/constants/purchase";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useSetSearchParams from "@/hooks/useSetSearchParams";

const PurchaseListView = () => {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useSetSearchParams();

  const purchaseType = searchParams.get("type");

  const defaultSelectValue = useMemo(
    () => (purchaseType ? { label: purchaseType, value: purchaseType } : undefined),
    [purchaseType]
  );

  const Table = useMemo(() => {
    switch (purchaseType) {
      case "APPAREL":
        return <ApparelPurchaseListTable />;
      case "IT":
        return <OtherPurchaseListTable type="IT" />;
      case "ELECTRONIC":
        return <OtherPurchaseListTable type="ELECTRONIC" />;
      case "CIVIL":
        return <OtherPurchaseListTable type="CIVIL" />;
      case "ELECTRICAL":
        return <OtherPurchaseListTable type="ELECTRICAL" />;
      default:
        return <ApparelPurchaseListTable />;
    }
  }, [purchaseType]);

  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Purchase List" />

      <div className="flex flex-col gap-[5px]">
        <label className="form-label">Select Purchase Type</label>
        <SelectionBox
          data={purchaseTypes}
          defaultValue={defaultSelectValue}
          onSelect={(item) => {
            const nextType = item.value?.toUpperCase?.() ?? "";
            updateSearchParams({ type: nextType });
          }}
        />
      </div>

      {Table}
    </div>
  );
};

export default PurchaseListView;
