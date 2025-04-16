  exports.getUserByIdSchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer' }
      }
    }
  };
  