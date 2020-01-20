export const config = {
  version: '0.0.1',
  src: 'src',
  automation: {
    types: [
      {
        type: 'style',
        src: 'src/styles',
        files: {
          ext: '.scss',
          nameCase: 'camelCase',
          prefix: '',
          suffix: '',
        },
        folders: {
          nameCase: 'lowerCase',
          prefix: '',
          suffix: '',
        },
        templates: [
          {
            name: 'emptyFile',
            content: `
                    // This is an empty file
                    `,
            type: 'default',
          },
        ],
        dependencies: ['node-sass'],
        questions: [
          {
            name: 'STYLE_FILE_NAME',
            type: 'input',
            message: 'Enter the name of the style file you want to create',
          },
        ],
      },
      {
        type: 'components',
        src: 'src/components',
        files: {
          ext: '.tsx',
          nameCase: 'pascalCase',
          prefix: '',
          suffix: '',
        },
        folders: {
          nameCase: 'lowerCase',
          prefix: '',
          suffix: '',
        },
        templates: [
          {
            name: 'basicComponent',
            content: `
                      import React, { useSate } from 'react';

                      const ${name} = (props) => {

                        const [state, setState] = useSate({
                          name: ${name}
                        })

                        return (
                          <div>
                            <span>{``Basic template for ${name}``}</span>
                          </div>
                        )
                      }

                      export default ${name};
                    `,
            type: 'default',
          },
        ],
        dependencies: [
          {
            name: 'react',
            version: '16.8',
          },
        ],
        questions: [
          {
            name: 'COMPONENT_FILE_NAME',
            type: 'input',
            message: 'Enter the name of the component file you want to create',
          },
        ],
      },
    ],
  },
}
