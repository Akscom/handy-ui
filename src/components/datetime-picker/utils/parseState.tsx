const isExtendDate = (date:any) => {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
};

const parseState = (props:any) => {
  const date = props.value && isExtendDate(props.value);
  const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);
  const wheelDefault = props.wheelDefaultValue && isExtendDate(props.wheelDefaultValue);
  return {
    date: date || defaultDate,
    wheelDefault,
  };
};


export {
  isExtendDate,
  parseState,
};
