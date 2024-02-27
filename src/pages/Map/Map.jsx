import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'



import {
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    useJsApiLoader,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP,
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    if (!isLoaded) {
        return <SkeletonText />
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    return (
        <div className='pt-28'>
            <Flex
                position='relative'
                flexDirection='column'
                alignItems='center'
                h='100vh'
                w='100vw'
            >
                <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                    {/* Google Map Box */}
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={map => setMap(map)}
                    >
                        <Marker position={center} />
                        {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} />
                        )}
                    </GoogleMap>
                </Box>
                <Box
                    p={4}
                    borderRadius='lg'
                    m={4}
                    bgColor='white'
                    shadow='base'
                    minW='container.md'
                    zIndex='1'
                >
                    <HStack spacing={2} justifyContent='space-between'>
                        <Box flexGrow={1}>
                            <Autocomplete>
                                <Input type='text' placeholder='Origin' ref={originRef} />
                            </Autocomplete>
                        </Box>
                        <Box flexGrow={1}>
                            <Autocomplete>
                                <Input
                                    type='text'
                                    placeholder='Destination'
                                    ref={destiantionRef}
                                />
                            </Autocomplete>
                        </Box>

                        <ButtonGroup>
                            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                                Calculate Route
                            </Button>
                            <IconButton
                                aria-label='center back'
                                icon={<FaTimes />}
                                onClick={clearRoute}
                            />
                        </ButtonGroup>
                    </HStack>
                    <HStack spacing={4} mt={4} justifyContent='space-between'>
                        <Text>Distance: {distance} </Text>
                        <Text>Duration: {duration} </Text>
                        <IconButton
                            aria-label='center back'
                            icon={<FaLocationArrow />}
                            isRound
                            onClick={() => {
                                map.panTo(center)
                                map.setZoom(15)
                            }}
                        />
                    </HStack>
                </Box>
            </Flex>
        </div>
    )
}

export default Map;



// import React, { useRef, useState } from 'react';
// import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, Text } from '@chakra-ui/react';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa';

// const Map = () => {
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');
//   const [error, setError] = useState(null);
//   const [mapUrl, setMapUrl] = useState('');

//   const originRef = useRef(null);
//   const destinationRef = useRef(null);

//   const calculateRoute = (event) => {
//     event.preventDefault(); // Prevent default form submission behavior

//     if (!originRef.current || !destinationRef.current) return;

//     const origin = encodeURIComponent(originRef.current.value);
//     const destination = encodeURIComponent(destinationRef.current.value);

//     // Constructing a URL for a static map with markers and a path
//     const url = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:red%7Clabel:A%7C${origin}&markers=color:green%7Clabel:B%7C${destination}&path=color:0x0000ff%7Cweight:5%7C${origin}|${destination}`;

//     setMapUrl(url);
//     setError(null);
//   };

//   const clearRoute = () => {
//     setDistance('');
//     setDuration('');
//     originRef.current.value = '';
//     destinationRef.current.value = '';
//     setMapUrl('');
//     setError(null);
//   };

//   return (
//     <div className="pt-28">
//       <Flex position="relative" flexDirection="column" alignItems="center" h="100vh" w="100vw">
//         <Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md" zIndex="1">
//           <form onSubmit={calculateRoute}>
//             <HStack spacing={2} justifyContent="space-between">
//               <Box flexGrow={1}>
//                 <Input type="text" placeholder="Origin" ref={originRef} />
//               </Box>
//               <Box flexGrow={1}>
//                 <Input type="text" placeholder="Destination" ref={destinationRef} />
//               </Box>
//               <ButtonGroup>
//                 <Button colorScheme="pink" type="submit">
//                   Calculate Route
//                 </Button>
//                 <IconButton
//                   aria-label="center back"
//                   icon={<FaTimes />}
//                   onClick={clearRoute}
//                 />
//               </ButtonGroup>
//             </HStack>
//           </form>
//           <HStack spacing={4} mt={4} justifyContent="space-between">
//             <Text>Distance: {distance} </Text>
//             <Text>Duration: {duration} </Text>
//           </HStack>
//           {error && (
//             <Text mt={4} color="red.500">
//               Error: {error}
//             </Text>
//           )}
//         </Box>
//         {mapUrl && (
//           <img src={mapUrl} alt="Map" style={{ maxWidth: '100%', maxHeight: '50vh', marginTop: '20px' }} />
//         )}
//       </Flex>
//     </div>
//   );
// };

// export default Map;

  