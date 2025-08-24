import React, { useState } from 'react';
import {
  Card, CardContent, Typography,
  IconButton, Stack, Divider, Box, Button,
  Chip, Avatar
} from '@mui/material';
import { Add, DeleteOutline, LocalMall, Remove } from '@mui/icons-material';
import type { Product } from '../types/Product';
import { mockProducts } from '../types/mockProducts';
import { useNavigate } from 'react-router-dom';

const top5Products = mockProducts.slice(0, 5);

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>(top5Products);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    top5Products.reduce((acc, product) => ({
      ...acc,
      [product.id]: 1 // Default quantity
    }), {})
  );

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const totalPrice = items.reduce(
    (sum, item) => {
      const quantity = quantities[item.id] || 1;
      return sum + (item.price - (item.discount || 0)) * quantity
    }, 0);

  const totalOriginal = items.reduce((sum, item) => sum + item.price * quantities[item.id], 0);

  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      justifyContent: 'space-between',
      gap: { xs: 2, md: 4 },
      p: { xs: 1, md: 3 },
      backgroundColor: 'rgba(249,249,255,1)'
    }}>
      {/* LEFT: Items List */}
      <Box sx={{
        flex: 1,
        minWidth: 0,
        width: '100%',
        order: { xs: 2, lg: 1 }
      }}>
        <Typography variant="h4" fontWeight="bold" mb={4} sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          color: '#d23f57',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}>
          <LocalMall sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }} />
          Your Shopping Bag
          <Chip label={`${items.length} items`} color="primary" size="small" />
        </Typography>

        <Stack spacing={3} sx={{ ml: { xs: 0, lg: 10 } }}>
          {items.map(item => (
            <Card
              key={item.id}
              elevation={1}
              sx={{
                width: { xs: '100%', lg: '30rem' },
                borderRadius: '12px',
                overflow: 'visible',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                position: 'relative',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(210, 63, 87, 0.15)'
                }
              }}
            >
              <Box sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                display: 'flex',
                gap: 1
              }}>
                <IconButton 
                  sx={{ 
                    bgcolor: 'white', 
                    boxShadow: 1,
                    '&:hover': { 
                      bgcolor: '#ffeeee',
                      color: '#d23f57' 
                    }
                  }}
                  onClick={() => handleDeleteItem(item.id)}
                  aria-label="Delete item"
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
              
              <CardContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                  <Avatar
                    src={item.imageUrl}
                    alt={item.name}
                    sx={{ 
                      width: { xs: 80, sm: 120 }, 
                      height: { xs: 80, sm: 120 }, 
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    variant="rounded"
                  />
                  <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap={false} sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 2, sm: 1 },
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Brand: {item.brand}
                    </Typography>
                    
                    <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, -1)}
                        sx={{
                          width: 32,
                          height: 32,
                          border: '1px solid #e0e0e0',
                          '&:hover': {
                            backgroundColor: '#ffeeee',
                          }
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      
                      <Typography variant="body1" sx={{ 
                        px: 1.5, 
                        py: 0.5, 
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px'
                      }}>
                        {quantities[item.id]}
                      </Typography>
                      
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, 1)}
                        sx={{
                          width: 32,
                          height: 32,
                          border: '1px solid #e0e0e0',
                          '&:hover': {
                            backgroundColor: '#ffeeee',
                          }
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Stack>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography variant="h6" color="text.primary" fontWeight="bold">
                        {item.price?.toString()} Toman
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* RIGHT: Summary */}
      <Box sx={{ 
        width: { xs: '100%', lg: '380px' }, 
        alignSelf: { xs: 'center', lg: 'flex-start' },
        order: { xs: 1, lg: 2 },
        mr: { xs: 0, lg: 15 },
        mb: { xs: 3, lg: 0 }
      }}>
        <Card sx={{ 
          p: 3, 
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(210, 63, 87, 0.1)',
          border: 'none',
          background: 'linear-gradient(to bottom, #fff, #fff9f9)',
          marginTop: 2,
        }}>
          <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: '#d23f57' }}>
            Order Summary
          </Typography>
          
          <Stack spacing={1} mb={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Subtotal ({items.length} items)</Typography>
              <Typography variant="body2">{totalOriginal.toLocaleString()} Toman</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2" color="success.main">
                Free
              </Typography>
            </Box>
          </Stack>
          
          <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.08)' }} />
          
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
            <Typography variant="h6" fontWeight="bold" color="#d23f57">
              {totalPrice.toLocaleString()} Toman
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ 
              bgcolor: '#d23f57',
              borderRadius: '8px',
              py: 1.5,
              '&:hover': {
                bgcolor: '#b2374a',
                boxShadow: '0 4px 12px rgba(210, 63, 87, 0.3)'
              }
            }}
          >
            Proceed to Checkout
          </Button>
          
          <Typography variant="caption" display="block" mt={2} textAlign="center" color="text.secondary">
            or <Button onClick={() => navigate("/")} variant="text" size="small" sx={{ color: '#d23f57' }}>Continue Shopping</Button>
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default OrderList;