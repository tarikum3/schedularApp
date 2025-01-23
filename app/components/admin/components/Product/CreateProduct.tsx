'use client';

// import React from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import Autocomplete from '@mui/material/Autocomplete';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Typography from '@mui/material/Typography';
// import { z,  } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Icon from '@mui/material/Icon';

// import {  useCreateProductMutation,useUploadProductImageMutation } from '@lib/admin/store/services/product'


//   const schema = z.object({
// 	name: z.string().nonempty('Product Name is required.'),

//   });
//   const defaultValues = {
// 	name: '',

// };
// const CreateProduct: React.FC = () => {



// 	const { handleSubmit, register, reset, control, watch, formState } = useForm({
// 		defaultValues,
// 		mode: 'all',
// 		resolver: zodResolver(schema)
// 	});

// 	const { isValid, dirtyFields, errors, touchedFields } = formState;

// 	const [createProduct, ] = useCreateProductMutation();


// 	const handleFormSubmit = async (data: Record<string, any>) => {
// 		try {
// 		  console.log('Submitting data...', data);
	
// 		  // If you need to upload images to an API
// 		  const formData = new FormData();
	
	
// 		  // Mock API call
// 		 const response= await createProduct({ ...data });
// 		  console.log('Data submitted successfully:', response);
// 		} catch (error) {
// 		  console.error('Error submitting data:', error);
// 		}
// 	  };


//   return (
//   <>

// <div className="flex w-full max-w-screen-md justify-start items-start">

// <form
//         className="w-full text-primary space-y-10 p-5 m-5"
//         onSubmit={handleSubmit(handleFormSubmit)}
//       >
//       <div className="text-primary space-y-10 p-5 m-5">
  

// <div className="mt-48 mb-16">
// 					<Controller
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								label="Product Name"
// 								variant="outlined"
// 								error={!!errors.name}
// 								helperText={errors?.name?.message}
// 								required
// 								fullWidth
// 							/>
// 						)}
// 						name="name"
// 						control={control}
// 					/>
// 				</div>

   

// 				</div>
//       </form>
//     </div>



//   </>
//   );
// };

// export default CreateProduct;




// import React from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import Autocomplete from '@mui/material/Autocomplete';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Typography from '@mui/material/Typography';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Icon from '@mui/material/Icon';
// import { useCreateProductMutation } from '@lib/admin/store/services/product';

// const categoryList = ["Electronics", "Apparel", "Home", "Beauty", "Sports", "Books", "Toys"];

// const schema = z.object({
//   name: z.string().nonempty('Product Name is required.'),
//   description: z.string().optional(),
//   slug: z.string().nonempty('Slug is required.'),
//   sku: z.string().optional(),
//   category: z.string().optional(),
//   vendor: z.string().optional(),
//   tags: z.array(z.string()).optional(),
//   availableForSale: z.boolean(),
// });

// const defaultValues = {
//   name: '',
//   description: '',
//   slug: '',
//   sku: '',
//   category: '',
//   vendor: '',
//   tags: [],
//   availableForSale: true,
// };

// const CreateProduct: React.FC = () => {
//   const { handleSubmit, register, control, formState } = useForm({
//     defaultValues,
//     mode: 'all',
//     resolver: zodResolver(schema),
//   });

//   const { errors } = formState;
//   const [createProduct] = useCreateProductMutation();

//   const handleFormSubmit = async (data: Record<string, any>) => {
//     try {
//       console.log('Submitting data...', data);
//       const response = await createProduct(data);
//       console.log('Data submitted successfully:', response);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };

//   return (
//     <div className="flex w-full max-w-screen-md justify-start items-start ">
//       <form
//         className="w-full text-primary space-y-10 p-5 m-5"
//         onSubmit={handleSubmit(handleFormSubmit)}
//       >
//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Product Name"
//                 variant="outlined"
//                 error={!!errors.name}
//                 helperText={errors?.name?.message}
//                 required
//                 fullWidth
//               />
//             )}
//             name="name"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Description"
//                 variant="outlined"
//                 multiline
//                 rows={4}
//                 fullWidth
//               />
//             )}
//             name="description"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Slug"
//                 variant="outlined"
//                 error={!!errors.slug}
//                 helperText={errors?.slug?.message}
//                 required
//                 fullWidth
//               />
//             )}
//             name="slug"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="SKU"
//                 variant="outlined"
//                 fullWidth
//               />
//             )}
//             name="sku"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <Autocomplete
//                 {...field}
//                 options={categoryList}
//                 getOptionLabel={(option) => option}
//                 renderInput={(params) => (
//                   <TextField {...params} label="Category" variant="outlined" fullWidth />
//                 )}
//                 onChange={(_, value) => field.onChange(value)}
//               />
//             )}
//             name="category"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Vendor"
//                 variant="outlined"
//                 fullWidth
//               />
//             )}
//             name="vendor"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <Autocomplete
//                 {...field}
//                 multiple
//                 options={[]}
//                 freeSolo
//                 renderInput={(params) => (
//                   <TextField {...params} label="Tags" variant="outlined" fullWidth />
//                 )}
//                 onChange={(_, value) => field.onChange(value)}
//               />
//             )}
//             name="tags"
//             control={control}
//           />
//         </div>

//         <div className="mt-48 mb-16">
//           <Controller
//             render={({ field }) => (
//               <FormControlLabel
//                 control={<Checkbox {...field} checked={field.value} />}
//                 label="Available For Sale"
//               />
//             )}
//             name="availableForSale"
//             control={control}
//           />
//         </div>

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           size="large"
//           fullWidth
//         >
//           Create Product
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;




import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

interface ProductOptionProps {
  name?: string;
  values?: string[];
  onUpdate: (updated: { name: string; values: string[] }) => void;
}

const ProductOption: React.FC<ProductOptionProps> = ({ name = '', values = [], onUpdate }) => {
  const [optionName, setOptionName] = useState(name);
  const [valueInput, setValueInput] = useState('');
  const [valueList, setValueList] = useState<string[]>(values);
  const [error, setError] = useState('');

  const handleUpdate = useCallback(() => {
    onUpdate({ name: optionName, values: valueList });
  }, [optionName, valueList, ]);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const handleAddValue = () => {
    if (valueInput.trim() !== '' && !valueList.includes(valueInput.trim())) {
      setValueList((prev) => [...prev, valueInput.trim()]);
      setValueInput('');
    }
  };

  const handleDeleteValue = (value: string) => {
    setValueList((prev) => prev.filter((v) => v !== value));
  };

  const handleDone = () => {
    if (optionName.trim() === '' || valueList.length === 0) {
      setError('Option name and values cannot be empty.');
      return;
    }
    setError('');
    alert(`Submitted Option: ${optionName}, Values: ${valueList.join(', ')}`);
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      {/* TextField for Option Name */}
      <TextField
        label="Option Name"
        variant="outlined"
        fullWidth
        value={optionName}
        onChange={(e) => setOptionName(e.target.value)}
      />

      {/* Input for Adding Values */}
      <div className="flex items-center space-x-2">
        <TextField
          label="Add Values"
          variant="outlined"
          placeholder="Add values"
          fullWidth
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <IconButton color="primary" onClick={handleAddValue}>
          <AddIcon />
        </IconButton>
      </div>

      {/* List of Values */}
      <List>
        {valueList.map((value, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={value} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDeleteValue(value)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Validation Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Done Button */}
      <div className="flex justify-end">
        <Button variant="contained" color="primary" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [optionData, setOptionData] = useState({ name: 'Sample Option', values: ['Value 1', 'Value 2'] });

  const handleUpdate = (updated: { name: string; values: string[] }) => {
    console.log('Updated Data:', updated);
    setOptionData(updated);
  };

  return (
    <div className="p-4">
      <h1>Product Option Editor</h1>
      <ProductOption
        name={optionData.name}
        values={optionData.values}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
