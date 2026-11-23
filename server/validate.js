const STATUSES = ['todo', 'doing', 'done'];
function validate(data, partial = false) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error('Body must be an object');
  const keys = Object.keys(data);
  if (keys.some(k => !['title','status'].includes(k)) || !keys.length) throw Error('Allowed fields: title and status');
  const output = {};
  if ('title' in data) {
    if (typeof data.title !== 'string' || !data.title.trim() || data.title.trim().length > 120) throw Error('Title must be 1–120 characters');
    output.title = data.title.trim();
  } else if (!partial) throw Error('Title is required');
  if ('status' in data) {
    if (!STATUSES.includes(data.status)) throw Error('Invalid status');
    output.status = data.status;
  }
  return output;
}
module.exports = {validate};
