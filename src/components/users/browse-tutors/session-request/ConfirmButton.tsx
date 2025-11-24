import { FormButton } from "@/components/forms/FormButton";

export function ConfirmButton({
  handleSubmit,
  disabled,
}: {
  handleSubmit: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex justify-end pt-2">
      <FormButton
        disabled={disabled}
        size="xs"
        text="Confirm"
        handleClick={handleSubmit}
      />
    </div>
  );
}
