"use client";

import { PageHeadingTitle, SelectionBox, ApparelForm, OtherPurchaseForm } from "@/components";
import { purchaseTypes } from "@/constants/purchase";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useSetSearchParams from "@/hooks/useSetSearchParams";

const CreatePurchaseView = () => {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useSetSearchParams();

  const purchaseType = searchParams.get("type");

  const defaultSelectValue = useMemo(
    () => (purchaseType ? { label: purchaseType, value: purchaseType } : undefined),
    [purchaseType]
  );

  const Form = useMemo(() => {
    switch (purchaseType) {
      case "APPAREL":
        return <ApparelForm />;
      case "IT":
        return <OtherPurchaseForm type="IT" />;
      case "ELECTRONIC":
        return <OtherPurchaseForm type="ELECTRONIC" />;
      case "CIVIL":
        return <OtherPurchaseForm type="CIVIL" />;
      case "ELECTRICAL":
        return <OtherPurchaseForm type="ELECTRICAL" />;
      default:
        return <ApparelForm />;
    }
  }, [purchaseType]);

  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Create Purchase" />

      <div className="flex flex-col gap-[5px]">
        <label className="form-label">Select Purchase Type</label>
        <SelectionBox
          data={purchaseTypes}
          defaultValue={defaultSelectValue}
          onSelect={(item) => {
            const nextType = item?.value?.toUpperCase?.() ?? "";
            updateSearchParams({ type: nextType });
          }}
        />
      </div>

      {Form}
    </div>
  );
};

export default CreatePurchaseView;
