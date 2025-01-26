// import Button from '@material-ui/core/Button';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MenuItem from '@material-ui/core/MenuItem';
// import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
// import { useState } from 'react';



// const languages = [
//   {
//     id: 'en',
//     title: 'English',
//     flag: 'us',
//   },
//   {
//     id: 'tr',
//     title: 'Turkish',
//     flag: 'tr',
//   },
//   {
//     id: 'ar',
//     title: 'Arabic',
//     flag: 'sa',
//   },
// ];

// function LanguageSwitcher() {
  

//   const [menu, setMenu] = useState(null);
//   const [currentLanguage, setCurrentLanguage] = useState(  {
//     id: 'en',
//     title: 'English',
//     flag: 'us',
//   });

//   const langMenuClick = (event) => {
//     setMenu(event.currentTarget);
//   };

//   const langMenuClose = () => {
//     setMenu(null);
//   };

//   function handleLanguageChange(lng) {
//     setCurrentLanguage(lng);

//     langMenuClose();
//   }

//   return (
//     <>
//       <Button className="h-40 w-64" onClick={langMenuClick}>
//         <img
//           className="mx-4 min-w-20"
//           src={`assets/images/flags/${currentLanguage.flag}.png`}
//           alt={currentLanguage.title}
//         />

//         <Typography className="mx-4 font-semibold uppercase" color="textSecondary">
//           {currentLanguage.id}
//         </Typography>
//       </Button>

//       <Popover
//         open={Boolean(menu)}
//         anchorEl={menu}
//         onClose={langMenuClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//         classes={{
//           paper: 'py-8',
//         }}
//       >
//         {languages.map((lng) => (
//           <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
//             <ListItemIcon className="min-w-40">
//               <img
//                 className="min-w-20"
//                 src={`assets/images/flags/${lng.flag}.png`}
//                 alt={lng.title}
//               />
//             </ListItemIcon>
//             <ListItemText primary={lng.title} />
//           </MenuItem>
//         ))}

     
//       </Popover>
//     </>
//   );
// }

// export default LanguageSwitcher;


import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useState, MouseEvent } from 'react';

interface Language {
  id: string;
  title: string;
  flag: string;
}

const languages: Language[] = [
  {
    id: 'en',
    title: 'English',
    flag: 'us',
  },
  {
    id: 'tr',
    title: 'Turkish',
    flag: 'tr',
  },
  {
    id: 'ar',
    title: 'Arabic',
    flag: 'sa',
  },
];

const LanguageSwitcher = () => {
  const [menu, setMenu] = useState<HTMLElement | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    id: 'en',
    title: 'English',
    flag: 'us',
  });

  const langMenuClick = (event: MouseEvent<HTMLElement>): void => {
    setMenu(event.currentTarget);
  };

  const langMenuClose = (): void => {
    setMenu(null);
  };

  function handleLanguageChange(lng: Language): void {
    setCurrentLanguage(lng);
    langMenuClose();
  }

  return (
    <>
      <Button className="h-40 w-64" onClick={langMenuClick}>
        <img
          className="mx-4 min-w-20"
          src={`assets/images/flags/${currentLanguage.flag}.png`}
          alt={currentLanguage.title}
        />

        <Typography className="mx-4 font-semibold uppercase" color="textSecondary">
          {currentLanguage.id}
        </Typography>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            <ListItemIcon className="min-w-40">
              <img
                className="min-w-20"
                src={`assets/images/flags/${lng.flag}.png`}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
