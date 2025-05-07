import { CheckboxGroup, Checkbox } from "@heroui/react";

export const Card = () => {
    return (
        <CheckboxGroup
            defaultValue={["buenos-aires", "london"]}
            label="Select cities"
        >
            <Checkbox value="buenos-aires"></Checkbox>
        </CheckboxGroup>
    );
};
