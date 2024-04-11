import {useState} from 'react';

type Validation<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

type Errors<T> = {
  [K in keyof T]?: string;
};

interface Props<T> {
  initialValues?: T;
  validation?: Validation<T>;
}

function useForm<T = undefined>(props?: Props<T>) {
  const [values, setValues] = useState<T>((props?.initialValues ?? {}) as T);
  const [errors, setErrors] = useState<Errors<T>>({});

  const getProps = <K extends keyof T>(key: K) => ({
    value: values?.[key],
    onChangeText: (value: T[K]) => {
      setValues(prev => prev && {...prev, [key]: value});
      if (props?.validation?.[key]) {
        const validate = props?.validation[key]?.(value);
        setErrors(prev => ({...prev, [key]: validate}));
      }
    },
  });

  const setFieldValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues(prev => prev && {...prev, [key]: value});
  };

  return {values, errors, getProps, setValues, setFieldValue};
}

export default useForm;
