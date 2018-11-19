import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {Field, GenericField, WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {style} from "typestyle";
import {IStore} from "../redux/IStore";

export const required = (id, defaultMessage) => {
  return (value) => (value ? undefined : {id, defaultMessage});
};

export const maxLength = (id, defaultMessage) => {
  return (max) => (value) => value && value.length > max ? {id, defaultMessage, values: {max}} : undefined;
};

export const minLength = (id, defaultMessage) => {
  return (min) => (value) => value && value.length < min ? {id, defaultMessage, values: {min}} : undefined;
};

export const numberType = (id, defaultMessage) => {
  return (value) => value && isNaN(Number(value)) ? {id, defaultMessage} : undefined;
};

export const minValue = (id, defaultMessage) => {
  return (min) => (value) => value < min ? {id, defaultMessage, values: {min}} : undefined;
};

export const matchedPwd = (id, defaultMessage) => {
  return (value, otherValues) => value !== otherValues.password ? {id, defaultMessage} : undefined;
};

export const email = (id, defaultMessage) => {
  return (value) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? {id, defaultMessage} : undefined;
  };
};

export const tooOld = (id, defaultMessage) => (value) => value && value > 65 ? {id, defaultMessage} : undefined;

export const aol = (id, defaultMessage) => {
  return (value) => value && /.+@aol\.com/.test(value) ? {id, defaultMessage} : undefined;
};

/*tslint:disable:object-literal-sort-keys*/
const styles = {
  row: style({
    margin: "15px 0"
  }),
  inputItem: style({
    padding: 5,
    border: "1px solid #ccc"
  }),
  message: style({
    marginTop: 5
  }),
  error: style({
    color: "red"
  }),
  warning: style({
    color: "darkorange"
  })
};
/*tslint:enable:object-literal-sort-keys*/

/*tslint:disable:jsx-no-multiline-js*/
class CustomField extends React.Component<IProps & IStateToProps & IFlexWrappedFieldProps> {
  public render(): JSX.Element {
    const {defaultMessage, input, languageId, type, meta: {active, touched, error, warning}} = this.props;
    return (
      <div className={styles.row}>
        <FormattedMessage id={languageId} defaultMessage={defaultMessage} />
        <div>
          <input {...input}
                 placeholder={this.props.translations[languageId] || defaultMessage}
                 type={type}
                 className={styles.inputItem}
          />
          {
            (active || touched) &&
            (
              (
                error &&
                <div className={styles.message}>
                <span className={styles.error}>
                  <FormattedMessage id={error.id} defaultMessage={error.defaultMessage} values={error.values} />
                </span>
                </div>
              )
              ||
              (
                warning &&
                <div className={styles.message}>
                <span className={styles.warning}>
                  <FormattedMessage id={warning.id} defaultMessage={warning.defaultMessage} values={warning.values} />
                </span>
                </div>
              )
            )
          }
        </div>
      </div>
    );
  }
}

interface IProps {
  defaultMessage: string;
  languageId: string;
  type?: string;
}

interface IStateToProps {
  translations: any;
}

interface IFlexWrappedFieldProps {
  input?: Partial<WrappedFieldInputProps>;
  meta?: Partial<WrappedFieldMetaProps>;
}

export const CustomFieldRenderer = Field as new () => GenericField<IProps>;

const mapStateToProps = (state: Pick<IStore, "settings">) => ({
  translations: state.settings.payload.translations
});

const ConnectedCustomField = connect<IStateToProps, null, IProps & WrappedFieldProps>(mapStateToProps)(CustomField);

export {CustomField as UnconnectedCustomField, ConnectedCustomField as CustomField, mapStateToProps};