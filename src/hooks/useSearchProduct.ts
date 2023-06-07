import useQueryConfig from './useQueryConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Schema, schema } from 'src/utils/rules';
import { omit } from 'lodash';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from 'src/constant/path';

type FormData = Pick<Schema, 'name'>;

const nameSchema = schema.pick(['name']);
export default function useSearchProduct() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<FormData>({
    resolver: yupResolver(nameSchema),
    defaultValues: { name: '' }
  });

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name };
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    });
  });
  return { register, onSubmitSearch };
}
