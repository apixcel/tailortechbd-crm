export interface IFormMessage {
  message: string;
  type: "success" | "error";
}
interface IProps {
  formMessage: IFormMessage | null;
}

const FormMessage: React.FC<IProps> = ({ formMessage }) => {
  return (
    <>
      {formMessage ? (
        <span
          className={`text-[14px] font-[600] ${formMessage.type === "success" ? "text-success" : "text-danger"}`}
        >
          {formMessage.message}
        </span>
      ) : (
        ""
      )}
    </>
  );
};

export default FormMessage;
