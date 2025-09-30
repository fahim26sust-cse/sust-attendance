import { Grid, Card, CardContent, Typography } from '@mui/material';
import { VscLocation, VscCheckAll, VscKey } from 'react-icons/vsc';

const GeoFenceCard = ({ geoLocationData }) => {
    return (
        <Card
            sx={{
                backgroundColor: '#121212',
                color: 'white',
                p: { xs: 2, md: 3 },
                mt: 3,
                borderRadius: '16px',
                boxShadow: '0 0px 18px rgba(113, 250, 170, 0.84)',
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1.4rem', md: '1.8rem' },
                        fontWeight: 'bold',
                        color: '#00E5FF',
                        mb: 2,
                        textAlign: 'center',
                    }}
                >
                    Geo-Fence Data
                </Typography>

                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="stretch"
                    sx={{ maxWidth: '800px', margin: '0 auto' }}
                >
                    {geoLocationData?.geoLocation && (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    backgroundColor: '#1e1e1e',
                                    p: { xs: 2, md: 2.5 },
                                    borderRadius: '12px',
                                    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        fontWeight: 'bold',
                                        color: '#00E5FF',
                                        mb: 1,
                                    }}
                                >
                                    <VscLocation size={25} style={{ marginBottom: '-2px' }} />
                                    Location
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'lightgray', fontSize: { xs: '1rem', md: '1.05rem' } }}
                                >
                                    Latitude: <b>{geoLocationData.geoLocation.lat}</b>
                                    <br />
                                    Longitude: <b>{geoLocationData.geoLocation.lng}</b>
                                </Typography>
                            </Card>
                        </Grid>
                    )}
                    {geoLocationData?.permission && (
                        <Grid item xs={12} sm={12} md={4}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    backgroundColor: '#1e1e1e',
                                    p: { xs: 2, md: 2.5 },
                                    borderRadius: '12px',
                                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        fontWeight: 'bold',
                                        color: '#00E5FF',
                                        mb: 1,
                                    }}
                                >
                                    <VscCheckAll size={25} style={{ marginBottom: '-2px' }} />
                                    Permissions
                                </Typography>
                                <Typography
                                    variant="body2"

                                    sx={{ textAlign: 'center', color: 'white', fontSize: { xs: '1rem', md: '1.05rem' } }}
                                >
                                    {geoLocationData.permission}
                                </Typography>
                            </Card>
                        </Grid>
                    )}

                    {geoLocationData?.pin && (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#1e1e1e',
                                    p: { xs: 2, md: 2.5 },
                                    borderRadius: '12px',
                                    boxShadow: '0 3px 10px rgba(23, 246, 253, 0.67)',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px', 
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        fontWeight: 'bold',
                                        color: '#00E5FF',
                                        mb: 1,
                                    }}
                                >
                                    <VscKey size={25} style={{ marginBottom: '-2px' }} />
                                    Access Pin
                                </Typography>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '5rem' },
                                        color: '#00E5FF',
                                        fontWeight: 'bold',
                                        textShadow: '0 0 12px rgba(0,229,255,0.7)',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {geoLocationData.pin}
                                </Typography>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default GeoFenceCard;
