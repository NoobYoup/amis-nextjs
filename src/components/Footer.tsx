"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Footer() {
  return (
    <Box component="footer" sx={{ background: '#183f6d', color: 'white', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 260px' }}>
            <Typography variant="h6" sx={{ color: '#7cb342', fontWeight: 700 }}>AMIS School</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>Australian American International School - Nơi ươm mầm tương lai cho thế hệ trẻ.</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px' }}>
            <Typography variant="subtitle1">Liên kết nhanh</Typography>
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="#about" style={{ color: 'rgba(255,255,255,0.8)' }}>Giới thiệu</Link>
              <Link href="#programs" style={{ color: 'rgba(255,255,255,0.8)' }}>Chương trình học</Link>
              <Link href="#features" style={{ color: 'rgba(255,255,255,0.8)' }}>Đặc điểm nổi bật</Link>
              <Link href="#contact" style={{ color: 'rgba(255,255,255,0.8)' }}>Liên hệ</Link>
            </Box>
          </Box>
          <Box sx={{ flex: '1 1 200px' }}>
            <Typography variant="subtitle1">Đối tác</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
              University of Cambridge<br />University of Wisconsin<br />ETS - Educational Testing Service<br />University of Michigan
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption">&copy; 2025 AMIS School. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
}
