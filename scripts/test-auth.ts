/**
 * Test Authentication API
 */

async function testAuth() {
  console.log('🔐 Testing authentication API...');
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@easyiolabs.com',
        password: 'admin123'
      })
    });

    console.log(`Response status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Login successful!');
      console.log('User data:', {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role
      });
      console.log('Token received:', data.token ? 'Yes' : 'No');
    } else {
      const errorData = await response.text();
      console.log('❌ Login failed:', errorData);
    }
  } catch (error) {
    console.error('❌ Request failed:', error);
  }
}

testAuth();
