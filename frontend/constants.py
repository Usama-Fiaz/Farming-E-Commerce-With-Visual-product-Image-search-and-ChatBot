constants

BLACK, ROWS, RED, SQUARE SIZE, COLS, ITE

Piece piece topo

Board:

init__(s):

sit board = 0

self.red left & self.white_left = 12

self.red kings = self.white kings = 0

self.create_board()

f draw squares(self, win):

win.fill(BLACK)

for row in range(ROWS):

for col in range(row % 2, COLS, 2):

pygame.draw.rect(win, RED, (row SQUARE SIZE, col SQUARE SIZE, SQUARE SIZE, SQUARE_SIZE))

f move(self, piece, row, col):

self.board[piece.row][piece.col], self.board[row][col] = self.board[row][col], self.board[piece.row][piec piece.move(row, col)

if row = ROWS 1 or row == 0:

piece.make_king()

if piece.color == WHITE:

self.white kings = 1

else:

self.red_kings -= 1

ef get piece(self, row, col):

return self.board[row][col]

ef create board(self):

for row in range(ROWS):

self.board.append([])

for col in range(COLS):

if col % 2 == ((row 1) % 2):

if row < 3:

self.board[row].append(Piece(row, col, WHITE))

elif row > 4:

self.board[row].append(Piece(row, col, RED))

else:

self.board[row).append(0)

else:

self.board[row].append(0)
selt.board[row].append(Piece(row, col, RED))

else:

self board[row].append(0)

else:

self.board[row).append(0)

def draw(self, win):

self.draw squares(win)

for row in range(ROMS):

for col in range(COLS):

piece= self.board[row][col]

if piece = 0:

piece.draw(win)

def remove(self, pieces):

for piece in pieces:

self.board[piece.row][piece.col] = 0

if piece != 0:

if piece.color == RED:

self.red_left=1

else:

self.white left - 1

def winner (self):

if self.red left <= 0:

return WHITE

elif self.white_left <= 0:

return RED

return None

def get valid moves(self, piece):

Moves = ()

left = piece.col -1

