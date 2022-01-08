const container = document.getElementById('container');

const buildNewCursor = () => {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.background = 'lightblue';
  div.style.width = '60px';
  div.style.height = '60px';
  container.appendChild(div);
  return div;
};

const handleSubmitNewCursor = () => {
  // TODO: add different cursors for different users
};

socket.on('cursor', ({ data }) => {
  handleCursorChange(data);
});

const cursor = buildNewCursor();

const onMouseUpdate = (e) => {
  x = e.pageX;
  y = e.pageY;
  socket.emit('cursor', { data: [x, y] });
};

const setCursorPosition = (position) => {
  console.log('setCursorPosition', position);
  cursor.innerHTML = position;
  cursor.style.left = position[0] + 'px';
  cursor.style.top = position[1] + 'px';
};

const handleCursorChange = (position) => {
  messages.appendChild(setCursorPosition(position));
};

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
