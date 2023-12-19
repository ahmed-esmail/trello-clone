import React from 'react';

type NewItemFormProps = {
    onAdd(text: string): void;
}

const MyComponent = ({onAdd}: NewItemFormProps) => {
    return (
        <div>

        </div>
    );
};

export default MyComponent;
