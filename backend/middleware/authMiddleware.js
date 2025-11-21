const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const protect = ClerkExpressRequireAuth({
  onError: (error) => {
    console.error('Clerk authentication error:', error?.message || error);
  },
});

module.exports = { protect };

