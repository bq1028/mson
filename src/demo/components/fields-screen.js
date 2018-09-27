export default {
  name: 'app.FieldsScreen',
  component: 'app.Fields',
  fields: [
    {
      name: 'import',
      component: 'ButtonField',
      label: 'Import',
      icon: 'ImportContacts'
    },
    {
      name: 'reset',
      component: 'ButtonField',
      label: 'Reset',
      icon: 'ClearAll'
    },
    {
      name: 'toggleDisplayValues',
      component: 'ButtonField',
      label: 'Show Display Values',
      icon: 'ViewHeadline'
    },
    {
      name: 'toggleDisabled',
      component: 'ButtonField',
      label: 'Disable',
      icon: 'Lock'
    }
  ],
  listeners: [
    {
      event: 'import',
      actions: [
        {
          component: 'Set',
          name: 'component',
          value: {
            'fields.booleanField.value': true,
            'fields.chainedSelectField.value': [2, 5, 9, 10],
            'fields.chainedSelectListField.value': [[1, 3, 7], [2, 5, 9, 10]],
            'fields.collectionField.value': [
              {
                id: 'daenerys',
                firstName: 'Daenerys',
                lastName: 'Targaryen'
              },
              {
                id: 'jon',
                firstName: 'Jon',
                lastName: 'Snow'
              },
              {
                id: 'tyrion',
                firstName: 'Tyrion',
                lastName: 'Lannister'
              }
            ],
            'fields.dateField.value': '2018-09-27T17:24:24.960Z',
            'fields.emailField.value': 'test@example.com',
            'fields.idField.value': 'id-123',
            'fields.integerField.value': 123,
            'fields.numberField.value': 123.4,
            'fields.passwordField.value': 'password',
            'fields.personFullNameField.value': {
              firstName: 'Daenerys',
              lastName: 'Targaryen'
            },
            'fields.personNameField.value': 'Daenerys',
            'fields.selectField.value': 'red',
            'fields.selectFieldMult.value': ['red', 'blue'],
            'fields.selectListField.value': ['red', 'green'],
            'fields.timeField.value': '2018-09-27T17:24:24.960Z',
            'fields.textField.value': 'Go MSON'
          }
        }
      ]
    },
    {
      event: 'reset',
      actions: [
        {
          component: 'Set',
          name: 'reset',
          value: true
        }
      ]
    },
    {
      event: 'toggleDisplayValues',
      actions: [
        {
          component: 'Action',
          if: {
            'fields.id.useDisplayValue': {
              $ne: true
            }
          },
          actions: [
            {
              component: 'Set',
              name: 'component',
              value: {
                eachField: {
                  useDisplayValue: true
                },
                'fields.toggleDisplayValues': {
                  label: 'Hide Display Values',
                  icon: 'Input'
                }
              }
            }
          ],
          else: [
            {
              component: 'Set',
              name: 'component',
              value: {
                eachField: {
                  useDisplayValue: false
                },
                'fields.toggleDisplayValues': {
                  label: 'Show Display Values',
                  icon: 'ViewHeadline'
                }
              }
            }
          ]
        }
      ]
    },
    {
      event: 'toggleDisabled',
      actions: [
        {
          component: 'Action',
          if: {
            'fields.id.disabled': {
              $ne: true
            }
          },
          actions: [
            {
              component: 'Set',
              name: 'component',
              value: {
                disabled: true,
                'fields.toggleDisabled': {
                  label: 'Enable',
                  icon: 'LockOpen'
                }
              }
            },
            {
              // Renable so we can still click the button
              component: 'Set',
              name: 'fields.toggleDisabled.disabled',
              value: false
            }
          ],
          else: [
            {
              component: 'Set',
              name: 'component',
              value: {
                disabled: false,
                'fields.toggleDisabled': {
                  label: 'Disable',
                  icon: 'Lock'
                }
              }
            }
          ]
        }
      ]
    }
  ]
};
