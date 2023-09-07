import {vi} from 'vitest';

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    Link: vi.fn()
}))