import { Request, Response } from 'express';

const login = (req: Request, res: Response) => {
  const { password, userName } = req.body;

  if (userName === 'mrdiamond123' && password === '78945678') {
    res.status(200).json({
      meta: {
        statusCode: 200,
        message: '',
        error: '',
      },
      result: {
        data: {
          accessToken: 'abcXyz',
        },
      },
    });
  } else {
    res.status(401).json({
      meta: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'USER_002',
      },
      result: {
        data: null,
      },
    });
  }
};

const profile = (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (authorization === 'Bearer abcXyz') {
    res.status(200).json({
      meta: {
        statusCode: 200,
        message: '',
        error: '',
      },
      result: {
        data: {
          id: 1,
          createdAt: '2023-11-19T06:28:24.719Z',
          updatedAt: '2023-11-19T06:28:24.719Z',
          userName: 'mrdiamond12312',
          email: 'hoangkimcuong@gmail.com',
          password: '78945678',
          avatar:
            'https://rukminim2.flixcart.com/image/850/1000/l0y6qa80/stuffed-toy/u/d/t/duck-doll-10-simba-s-collection-original-imagcmspfdhpxfuy.jpeg?q=90',
          address: null,
          detailedAddress: null,
          dob: null,
          phoneNumber: null,
          fullName: 'Hoàng Kim Cương',
          role: 'user',
          CCCD: null,
        },
      },
    });
  } else {
    res.status(403).json({
      meta: {
        statusCode: 403,
        message: 'Unauthorized',
        error: 'USER_002',
      },
      result: {
        data: null,
      },
    });
  }
};

export default {
  'POST /auth/login': login,
  'GET /auth/profile': profile,
};
