import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'

export default antfu(
    {
        type: 'lib',
        vue: true,
    },
    eslintConfigPrettier,
    {
        'jsonc/indent': ['error', 4, {}],
    }
)
