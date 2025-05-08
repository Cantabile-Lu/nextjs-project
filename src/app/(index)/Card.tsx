import { CheckboxGroup, Checkbox } from "@heroui/react";

export const Card = () => {
    return (
        <CheckboxGroup defaultValue={["buenos-aires", "london"]}>
            <Checkbox value="buenos-aires"></Checkbox>
        </CheckboxGroup>
    );
};
