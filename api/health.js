module.exports = (_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      success: true,
      status: 'ok',
      timestamp: new Date().toISOString(),
    }),
  );
};
