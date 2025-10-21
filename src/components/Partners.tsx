import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';

export default function Partners() {
    const partners = [
        { src: '/images/logo_cambridge.png', alt: 'University of Cambridge' },
        { src: '/images/logo_michigan.png', alt: 'University of Michigan' },
        { src: '/images/logo_wisconsin.png', alt: 'University of Wisconsin' },
        { src: '/images/logo_ets.png', alt: 'ETS' },
    ];

    return (
        <section style={{ padding: '80px 0' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}>
                    Đối tác của AMIS
                </Typography>
                <Typography variant="h6" sx={{ display: 'block', textAlign: 'center', color: '#555' }}>
                    Hợp tác với các tổ chức giáo dục hàng đầu thế giới để mang lại chất lượng giáo dục tốt nhất
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {partners.map((partner, index) => (
                        <Grid item size={{ xs: 2, sm: 4, md: 3 }} key={index}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Image
                                    src={partner.src}
                                    alt={partner.alt}
                                    width={250}
                                    height={250}
                                    style={{ borderRadius: 8, objectFit: 'contain' }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );
}
