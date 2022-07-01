const initCls = {
  large: 'py-2.5 px-3 text-xl',
  big: 'py-2 px-2.5 text-lg',
  small: 'py-1.5 px-2 text-base',
  little: 'py-1 px-1.5 text-sm',
  less: 'py-0.5 px-1 text-xs',
  block: 'w-full',
  disable: 'cursor-not-allowed',
  icon: 'flex items-center',
};

const whiteCls = ' text-white ';
const blackCls = ' text-black ';

const initSchemeCls = {
  filled: {
    self: 'focus:outline-none rounded-md hover:shadow-lg',
    primary: 'bg-blue-500 hover:bg-blue-600' + whiteCls,
    secondary: 'bg-gray-500 hover:bg-gray-600' + whiteCls,
    success: 'bg-green-500 hover:bg-green-600' + whiteCls,
    danger: 'bg-red-500 hover:bg-red-600' + whiteCls,
    warning: 'bg-yellow-500 hover:bg-yellow-600' + whiteCls,
    white: 'rounded-md bg-white hover:bg-gray-50 ' + blackCls,
    info: 'bg-purple-500 hover:bg-purple-600' + whiteCls,
    dark: 'bg-gray-700 hover:bg-gray-900' + whiteCls,
  },
  border: {
    self: 'focus:outline-none rounded-md border',
    primary: 'text-blue-600 border-blue-600 hover:bg-blue-50',
    secondary: 'text-gray-600 border-gray-600 hover:bg-gray-50',
    success: 'text-green-600 border-green-600 hover:bg-green-50',
    danger: 'text-red-600 border-red-600 hover:bg-red-50',
    warning: 'text-yellow-600 border-yellow-600 hover:bg-yellow-50',
    white: 'text-black border-gray-100 hover:bg-gray-50',
    info: 'text-purple-600 border-purple-600 hover:bg-purple-50',
    dark: 'text-gray-800 border-gray-800 hover:bg-gray-200',
  },
  flat: {
    self: 'focus:outline-none rounded-md',
    primary: 'text-blue-600 hover:bg-blue-100',
    secondary: 'text-gray-600 hover:bg-gray-100',
    success: 'text-green-600 hover:bg-green-100',
    danger: 'text-red-600 hover:bg-red-100',
    warning: 'text-yellow-600 hover:bg-yellow-50',
    white: '',
    info: 'text-purple-600 hover:bg-purple-100',
    dark: 'text-gray-900 hover:bg-gray-200',
  },
  gradient: {
    self: 'focus:outline-none rounded-md transform bg-gradient-to-r hover:scale-105 duration-75',
    primary: ' from-blue-400 to-blue-600' + whiteCls,
    secondary: 'from-gray-400 to-gray-600' + whiteCls,
    success: 'from-green-400 to-green-600' + whiteCls,
    danger: 'from-red-400 to-red-600' + whiteCls,
    warning: 'from-yellow-400 to-yellow-600' + whiteCls,
    white: 'from-white to-gray-50' + blackCls,
    info: 'from-purple-400 to-purple-600' + whiteCls,
    dark: 'from-gray-600 to-gray-900' + whiteCls,
  },
  relief: {
    self: 'focus:outline-none border-b-4 rounded-md',
    primary: 'border-blue-600 bg-blue-500 hover:bg-blue-400' + whiteCls,
    secondary: 'border-gray-600 bg-gray-500 hover:bg-gray-400' + whiteCls,
    success: 'border-green-600 bg-green-500 hover:bg-green-400' + whiteCls,
    danger: 'border-red-600 bg-red-500 hover:bg-red-400' + whiteCls,
    warning: 'border-yellow-600 bg-yellow-500 hover:bg-yellow-400' + whiteCls,
    white: '' + blackCls,
    info: 'border-purple-600 bg-purple-500 hover:bg-purple-400' + whiteCls,
    dark: 'border-gray-800 bg-gray-700 hover:bg-gray-600' + whiteCls,
  },
  round: {
    self: 'focus:outline-none rounded-full border',
    primary: 'text-blue-600 border-blue-600 hover:bg-blue-50',
    secondary: 'text-gray-600 border-gray-600 hover:bg-gray-50',
    success: 'text-green-600 border-green-600 hover:bg-green-50',
    danger: 'text-red-600 border-red-600 hover:bg-red-50',
    warning: 'text-yellow-600 border-yellow-600 hover:bg-yellow-50',
    white: '',
    info: 'text-gray-400 border-gray-400 hover:bg-gray-100',
    dark: 'text-gray-800 border-gray-800 hover:bg-gray-200',
  },
};

export { initCls, initSchemeCls };
