import React from 'react';
import { useFormikContext } from 'formik';

function AppFormField({ name, ...otherProps }) {

    const {
        setFieldTouched,
        setFieldValue,
        errors,
        touched,
        values

    } = useFormikContext();
    return (
        <>
        </>
    );
}

export default AppFormField;