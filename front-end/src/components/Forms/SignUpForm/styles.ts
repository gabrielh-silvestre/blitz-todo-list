import tw from "tailwind-styled-components";

export const FormContainer = tw.form`
  container

  px-6
  py-12

  flex
  items-center
  justify-center
  grow
`;

export const FieldContainer = tw.fieldset`
  h-ful
  max-w-md

  flex
  flex-col
  justify-around
  items-center

  text-gray-800
`;

export const FieldLegend = tw.legend`
  mb-8

  font-semibold
  text-center
  text-2xl
`;

export const Label = tw.label`
  block

  mb-6
`;

export const TextInput = tw.input`
  m-0

  block
  
  w-full

  px-4
  py-2

  text-xl
  font-normal
  text-primary-text

  bg-white
  bg-clip-padding

  border
  border-solid
  border-gray-300
  rounded

  transition
  ease-in-out

  focus:outline-none
  focus:bg-white
  focus:border-red-700
`;

export const InputWarning = tw.span`
  text-xs
`;

// export const OptionsContainer = tw.div`
//   mb-6

//   flex
//   justify-between
//   items-center
// `;

// export const CheckBoxLabel = tw.label`
//   inline-block
//   text-gray-800
// `;

// export const CheckBox = tw.input`
//   appearance-none

//   h-4
//   w-4

//   mr-2
//   mt-1

//   border
//   border-gray-300
//   rounded-full

//   bg-white
//   checked:bg-red-700
//   checked:border-red-700

//   focus:outline-none

//   transition
//   duration-200

//   align-top

//   bg-no-repeat
//   bg-center
//   bg-contain

//   cursor-pointer
// `;

export const SubmitButton = tw.button`
  w-full

  inline-block

  px-7
  py-3

  font-medium
  text-sm
  text-white

  bg-red-600

  leading-snug

  uppercase

  rounded

  shadow-md

  hover:shadow-lg
  hover:bg-red-700

  focus:shadow-lg
  focus:outline-none
  focus:ring-0
  focus:bg-red-700

  active:shadow-lg
  active:bg-red-800

  disabled:cursor-not-allowed
  disabled:opacity-80
  disabled:shadow-none
  disabled:hover:bg-red-600

  transition
  duration-150
  ease-in-out
`;

export const ChangeForm = tw.span`
  text-red-600

  hover:text-red-700

  focus:text-red-700

  active:text-red-800

  cursor-pointer

  duration-200
  transition
  ease-in-out
`;

// export const Divisor = tw.div`
//   my-4

//   flex
//   items-center

//   before:flex-1
//   before:border-t
//   before:border-gray-300
//   before:mt-0.5

//   after:flex-1
//   after:border-t
//   after:border-gray-300
//   after:mt-0.5
// `;

// export const DivisorText = tw.p`
//   mx-4
//   mb-0

//   text-center
//   font-semibold
// `;

// export const AuthButton = tw.button`
//   w-full

//   flex
//   justify-center
//   items-center

//   mb-3
//   px-7
//   py-3

//   font-medium
//   text-sm
//   text-white

//   bg-gray-800

//   leading-snug
//   uppercase

//   rounded

//   shadow-md

//   hover:shadow-lg

//   focus:shadow-lg
//   focus:outline-none
//   focus:ring-0

//   active:shadow-lg

//   transition
//   duration-150

//   ease-in-out
// `
