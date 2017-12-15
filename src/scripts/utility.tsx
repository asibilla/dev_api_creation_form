
function setStateValue(prop: any, value: any) {
  this.setState((prevState: any, props: any) => {
    prevState[prop] = value;
    return prevState;
  });
}

export { setStateValue };
