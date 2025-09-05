// ProfitBalanceForm.tsx
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import PartnerDropDown from "../partner/PartnerDropDown";
import SectionTitle from "../shared/SectionTitle";
import Button from "../ui/Button";
import Input from "../ui/Input";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const initialValues = {
  partner: "", // ObjectId string
  totalProfitAmount: 0,
  currentProfitBalance: 0,
};

const numberField = (label: string, min = 0) =>
  Yup.number()
    .typeError(`${label} must be a number`)
    .required(`${label} is required`)
    .min(min, `${label} must be ≥ ${min}`);

const validationSchema = Yup.object().shape({
  partner: Yup.string()
    .matches(objectIdRegex, "Invalid partner id")
    .required("Partner is required"),
  totalProfitAmount: numberField("Total profit amount", 0),
  currentProfitBalance: numberField("Current profit balance", 0).max(
    Yup.ref("totalProfitAmount"),
    "Current profit balance cannot exceed total profit amount"
  ),
});

const ProfitBalanceForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Save Profit Balance",
}: {
  isLoading: boolean;
  defaultValue?: Partial<typeof initialValues>;
  onSubmit: (values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={{ ...initialValues, ...defaultValue }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-white p-4">
            <SectionTitle>Profit Balance</SectionTitle>

            <div className="flex items-start gap-[20px]">
              {/* left column */}
              <div className="flex w-full flex-col gap-[16px]">
                {/* Partner */}
                <div className="flex w-full flex-col gap-[5px]">
                  <PartnerDropDown
                    className="w-full lg:max-w-[unset] xl:max-w-[unset]"
                    selectionBoxClassName="w-full"
                    onSelect={(option) => setFieldValue("partner", option.value)}
                    // defaultValue={partnerOptions.find((opt) => opt.value === values.partner)}
                    // displayValue={partnerOptions.find((opt) => opt.value === values.partner)?.label}
                  />
                  <ErrorMessage name="partner" component="div" className="text-sm text-danger" />
                </div>

                {/* Total Profit Amount */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Total Profit Amount</label>
                  <Field
                    as={Input}
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    name="totalProfitAmount"
                    placeholder="0.00"
                  />
                  <ErrorMessage
                    name="totalProfitAmount"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* right column */}
              <div className="flex w-full flex-col gap-[16px]">
                {/* Current Profit Balance */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Current Profit Balance</label>
                  <Field
                    as={Input}
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    name="currentProfitBalance"
                    placeholder="0.00"
                  />
                  <ErrorMessage
                    name="currentProfitBalance"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* (Optional) derived helper display */}
                {/* <div className="text-sm text-muted-foreground">
                  Remaining (unallocated): {(Number(values.totalProfitAmount) || 0) - (Number(values.currentProfitBalance) || 0)}
                </div> */}
              </div>
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            {buttonLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfitBalanceForm;
