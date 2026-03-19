import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Route from '../models/Route';
import Logging from '../library/Logging';

dotenv.config();

type SeedRoute = {
    _id: string;
    name?: string;
    description: string;
    city: string;
    country: string;
    distance?: number;
    duration?: number;
    difficulty: 'easy' | 'medium' | 'hard';
    tags?: string[];
    userId: string;
};

const SEED_ROUTES: SeedRoute[] = [
    {
        _id: '66f000000000000000000001',
        userId: '65f000000000000000000078',
        difficulty: 'medium',
        city: 'Galicia',
        country: 'Spain',
        description: 'Family route through Galicia',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000002',
        userId: '65f00000000000000000007a',
        difficulty: 'medium',
        city: 'Galicia',
        country: 'Spain',
        description: 'Unplug and relax route through Galicia',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000003',
        userId: '65f00000000000000000007b',
        difficulty: 'medium',
        city: 'Galicia',
        country: 'Spain',
        description: 'Friends route through Galicia',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000004',
        userId: '65f0000000000000000000c8',
        difficulty: 'medium',
        city: 'Valencia',
        country: 'Spain',
        description: 'Rediscover the beauty of Valencia',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000005',
        userId: '65f0000000000000000000c8',
        difficulty: 'medium',
        city: 'Valencia',
        country: 'Spain',
        description: 'Bachelor party in Valencia',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000006',
        userId: '65f0000000000000000000aa',
        difficulty: 'medium',
        city: 'Valencia',
        country: 'Spain',
        description: 'Visit Valencia with kids',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000007',
        userId: '65f0000000000000000000a0',
        difficulty: 'medium',
        city: 'Sevilla',
        country: 'Spain',
        description: 'Charming Seville',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000008',
        userId: '65f0000000000000000000a0',
        difficulty: 'medium',
        city: 'Sevilla',
        country: 'Spain',
        description: 'Monuments of Seville',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f000000000000000000009',
        userId: '65f0000000000000000000a3',
        difficulty: 'medium',
        city: 'Sevilla',
        country: 'Spain',
        description: 'Party route through Seville',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f00000000000000000000a',
        userId: '65f000000000000000000098',
        difficulty: 'easy',
        city: 'Madrid',
        country: 'Spain',
        description: 'Madrid in black and white',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f00000000000000000000b',
        userId: '65f00000000000000000009d',
        difficulty: 'easy',
        city: 'Madrid',
        country: 'Spain',
        description: 'Modernist Madrid',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f00000000000000000000c',
        userId: '65f000000000000000000098',
        difficulty: 'hard',
        city: 'Madrid',
        country: 'Spain',
        description: 'Madrid in color',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f00000000000000000000d',
        userId: '65f000000000000000000099',
        difficulty: 'easy',
        city: 'Barcelona',
        country: 'Spain',
        description: 'Gaudi for a day',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f00000000000000000000e',
        userId: '65f0000000000000000000a8',
        difficulty: 'easy',
        city: 'Barcelona',
        country: 'Spain',
        description: 'Sunset in Montjuic',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    },
    {
        _id: '66f00000000000000000000f',
        userId: '65f00000000000000000009d',
        difficulty: 'easy',
        city: 'Barcelona',
        country: 'Spain',
        description: 'The charms of Pedralbes',
        name: '',
        distance: undefined,
        duration: undefined,
        tags: []
    }
];

const ALLOWED_DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

function validateSeedRoutes(routes: SeedRoute[]) {
    routes.forEach((route, index) => {
        if (!ALLOWED_DIFFICULTIES.has(route.difficulty)) {
            throw new Error('Invalid route at index ' + index);
        }

        if (!OBJECT_ID_REGEX.test(route.userId)) {
            throw new Error('Invalid userId at index ' + index);
        }

        if (!OBJECT_ID_REGEX.test(route._id)) {
            throw new Error('Invalid _id at index ' + index);
        }
    });
}

function isCompleteRoute(route: SeedRoute): boolean {
    const hasRequiredStrings =
        !!route.name &&
        !!route.description &&
        !!route.city &&
        !!route.country &&
        !!route.userId;

    const hasRequiredNumbers =
        typeof route.distance === 'number' &&
        typeof route.duration === 'number';

    return hasRequiredStrings && hasRequiredNumbers;
}

function mapToInsertableRoute(route: SeedRoute) {
    return {
        _id: route._id,
        name: route.name && route.name.trim().length > 0 ? route.name : ' ',
        description: route.description && route.description.trim().length > 0 ? route.description : ' ',
        city: route.city && route.city.trim().length > 0 ? route.city : ' ',
        country: route.country && route.country.trim().length > 0 ? route.country : ' ',
        distance: typeof route.distance === 'number' ? route.distance : 0,
        duration: typeof route.duration === 'number' ? route.duration : 0,
        difficulty: route.difficulty,
        tags: route.tags || [],
        userId: route.userId
    };
}

async function seedRoutes() {
    try {
        const MONGO_URL = process.env.MONGO_URI || '';
        if (!MONGO_URL) {
            throw new Error('MONGO_URI is not configured in .env');
        }

        await mongoose.connect(MONGO_URL, { retryWrites: true, w: 'majority' });
        Logging.info('MongoDB connection established');

        await Route.deleteMany({});
        Logging.info('Routes collection cleared');

        validateSeedRoutes(SEED_ROUTES);

        if (!SEED_ROUTES.length) {
            Logging.info('No routes defined in SEED_ROUTES');
            process.exit(0);
        }

        const routesToInsert = SEED_ROUTES.map(mapToInsertableRoute);
        const result = await Route.insertMany(routesToInsert);
        Logging.info('' + result.length + ' routes created successfully');

        process.exit(0);
    } catch (error) {
        Logging.error(`Error creating routes: ${error}`);
        process.exit(1);
    }
}

seedRoutes();