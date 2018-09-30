import Field from './field';
import utils from '../utils';
import { conformToMask } from 'react-text-mask';

export default class TextField extends Field {
  _className = 'TextField';

  _create(props) {
    super._create(props);

    this._requireString = true;

    this.set({
      schema: {
        component: 'Form',
        fields: [
          {
            name: 'minLength',
            component: 'IntegerField'
          },
          {
            name: 'maxLength',
            component: 'IntegerField'
          },
          {
            name: 'minWords',
            component: 'IntegerField'
          },
          {
            name: 'maxWords',
            component: 'IntegerField'
          },
          {
            // TODO: define list of acceptable values
            name: 'type',
            component: 'TextField'
          },
          {
            name: 'invalidRegExp',
            component: 'TextField'
          },
          {
            name: 'multiline',
            component: 'BooleanField'
          },
          {
            name: 'rows',
            component: 'IntegerField'
          },
          {
            name: 'rowsMax',
            component: 'IntegerField'
          },
          {
            name: 'mask',
            component: 'Field'
          },
          {
            name: 'unmask',
            component: 'RegExpField'
          }
        ]
      }
    });
  }

  _toValidatorProps() {
    const value = this.get('value');

    return {
      ...super._toValidatorProps(),
      length: value.length,
      words: value.split(/\s+/).length
    };
  }

  validate() {
    super.validate();

    if (!this.isBlank()) {
      const value = this.getValue();
      if (typeof value === 'string') {
        const minLength = this.get('minLength');
        const maxLength = this.get('maxLength');
        const invalidRegExp = this.get('invalidRegExp');

        if (minLength !== null && value.length < minLength) {
          this.setErr(`${minLength} characters or more`);
        } else if (maxLength !== null && value.length > maxLength) {
          this.setErr(`${maxLength} characters or less`);
        } else if (invalidRegExp && new RegExp(invalidRegExp).test(value)) {
          this.setErr(`invalid`);
        }
      } else if (this._requireString) {
        this.setErr(`must be a string`);
      }
    }

    // TODO: minWords, maxWords
  }

  _formatMask(mask) {
    if (Array.isArray(mask)) {
      return mask.map(item => {
        // Is the item a RegExp or a string that is not formatted as a RegExp?
        if (item instanceof RegExp || !utils.isRegExpString(item)) {
          return item;
        } else {
          // The string is formatted as a RegExp, e.g. '/foo/i'
          return utils.toRegExp(item);
        }
      });
    } else {
      // Function
      return mask;
    }
  }

  _formatUnmask(unmask) {
    return utils.toRegExp(unmask);
  }

  set(props) {
    const clonedProps = Object.assign({}, props);

    // Convert strings to RegExps?
    if (clonedProps.mask !== undefined) {
      clonedProps.mask = this._formatMask(clonedProps.mask);
    }

    // Convert string to RegExp?
    if (clonedProps.unmask !== undefined) {
      clonedProps.unmask = this._formatUnmask(clonedProps.unmask);
    }

    super.set(clonedProps);
  }

  getDisplayValue() {
    if (this.isBlank() || !this.get('mask')) {
      return super.getDisplayValue();
    } else {
      var conformed = conformToMask(this.getUIValue(), this.get('mask'), {
        guide: false
      });
      return conformed.conformedValue;
    }
  }

  toUnmaskedValue(value) {
    // The unmask is used to remove any formatting that should not be in our store
    const unmask = this.get('unmask');
    if (this.isValueBlank(value) || !unmask) {
      return value;
    } else {
      return value.replace(unmask, '');
    }
  }

  fromUIValue(value) {
    return this.toUnmaskedValue(value);
  }

  getUIValue() {
    return this.get('value');
  }
}
