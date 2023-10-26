/**
 * @swagger
 * tags:
 *  - name: Auth
 * /api/auth/register:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Register user.
 *     description: Create new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User has been created.
 *       409:
 *         description: User with email (email) already exists.
 *       500:
 *         description:	Internal server error.
 * /api/auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login user.
 *     description: Login user and return cookie with auth token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successfully.
 *       400:
 *         description: Invalid password.
 *       404:
 *         description: User does not exist.
 *       500:
 *         description: Internal server error.
 *
 * /api/auth/user:
 *   get:
 *     tags:
 *      - Auth
 *     summary: Verify user token.
 *     description: Verify user token and return user information. Requires an authentication token in the request headers (Bearer token).
 *     responses:
 *       200:
 *         description: User token verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verify:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Token undefined. The request must include an authentication token (Bearer token).
 *       401:
 *         description: Token verification failed. The provided authentication token is invalid or has expired.
 *
 * /api/auth/logout:
 *   get:
 *     tags:
 *      - Auth
 *     summary: Logout user.
 *     description: Log the user out and delete the authentication token. Requires an authentication token in the request headers (Bearer token).
 *     responses:
 *       200:
 *         description: User logged out.
 */
