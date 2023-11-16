/**
 * @swagger
 * tags:
 *  - name: Auth
 *  - name: Profile
 *  - name: Link
 *  - name: Search
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
 *
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Edit user information.
 *     description: Verify user token and return user information. Requires an authentication token in the request headers (Bearer token).
 *     responses:
 *       200:
 *         description: User information has been updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 profileDescription:
 *                   type: string
 *       400:
 *         description: Token undefined or invalid.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     tags:
 *      - Profile
 *     summary: Edit user information.
 *     description: Verify user token and return user information. Requires an authentication token in the request headers (Bearer token).
 *     responses:
 *       200:
 *         description: User information has been updated successfully.
 *       400:
 *         description: Token undefined or invalid.
 *       500:
 *         description: Internal server error.
 *
 * /api/link:
 *   post:
 *     tags:
 *      - Link
 *     summary: Add a link to user profile.
 *     description: Add a link to user profile. Requires an authentication token in the request headers (Bearer token).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: Link added to the user profile.
 *       401:
 *         description: Auth token is required.
 *       409:
 *         description: Selected link already exists in the user's profile.
 *
 * /api/link/{id}:
 *   patch:
 *     tags:
 *       - Link
 *     summary: Update a link in the user profile.
 *     description: Update a link in the user profile based on the provided link ID. Requires an authentication token in the request headers (Bearer token).
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the link to be updated.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Link updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the update was successful.
 *                 message:
 *                   type: string
 *                   description: A message confirming the update.
 *       401:
 *         description: User unauthorized. Auth token is required.
 *       404:
 *         description: Link with the specified ID not found.
 *
 *   delete:
 *     tags:
 *       - Link
 *     summary: Delete a link from the user profile.
 *     description: Delete a link from the user profile based on the provided link ID. Requires an authentication token in the request headers (Bearer token).
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the link to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Link deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deletion was successful.
 *                 message:
 *                   type: string
 *                   description: A message confirming the deletion.
 *       401:
 *         description: Auth token is required.
 *       404:
 *         description: Link with the specified ID not found.
 *
 * api/search/{searchValue}?limit={limitValue}:
 *  get:
 *    tags:
 *      - Search
 *    summary: Search users.
 *    description: Search users by first name or last name. Optionally limit the number of results.
 *    parameters:
 *      - name: searchValue
 *        in: path
 *        description: The value to search for.
 *        required: true
 *        schema:
 *          type: string
 *      - name: limitValue
 *        in: query
 *        description: The maximum number of results to return (optional).
 *        required: false
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Users found successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indicates whether the search was successful.
 *                searchValue:
 *                  type: string
 *                  description: The value used for the search.
 *                result:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      firstName:
 *                        type: string
 *                      lastName:
 *                        type: string
 *                      avatar:
 *                        type: string
 *                      profileId:
 *                        type: string
 *                      profileDescription:
 *                        type: string
 *              description: The array of users matching the search criteria.
 *      404:
 *        description: Users not found.
 *      500:
 *        description: Internal server error.
 */
