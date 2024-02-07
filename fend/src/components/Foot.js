import React from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import "./Foot.css"


const Foot = () => {
 

  return (
    <footer className="footer">
      <Typography variant="body2">&copy; 2024 Your eCommerce Website. All rights reserved.</Typography>
      <div className="footer1">
        <Link href="https://www.youtube.com/your-channel" target="_blank" rel="noopener noreferrer">
          YouTube
        </Link>
        |
        <Link href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
          Facebook
        </Link>
        |
        <Link href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </Link>
      </div>
    </footer>
  );
}

export default Foot;
