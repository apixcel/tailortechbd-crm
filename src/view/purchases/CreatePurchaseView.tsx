"use client";

import { PageHeadingTitle, SelectionBox, ApparelForm, OtherPurchaseForm } from "@/components";
import { purchaseTypes } from "@/constants/purchase";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CreatePurchaseView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [purchaseType, setPurchaseType] = useState<string>("Apparel");

  const setQueryParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value && value.length) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    const t = searchParams.get("type");
    setPurchaseType(t ? t.toUpperCase() : "APPAREL");
  }, [searchParams]);

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
        return null;
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
            setPurchaseType(nextType);
            setQueryParam("type", nextType.toLowerCase());
          }}
        />
      </div>

      {Form}
    </div>
  );
};

export default CreatePurchaseView;
