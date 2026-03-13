import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { type, approved } = await request.json(); // 'project' or 'developer', and true/false
    const table = type === 'developer' ? 'developers' : 'projects';
    console.log(`PATCH submisson: id=${params.id}, table=${table}, approved=${approved}`);

    const { data, error, count } = await supabase
      .from(table)
      .update({ approved: approved ?? true })
      .eq('id', params.id)
      .select();

    if (error) {
      console.error(`PATCH error:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error(`PATCH failed: No row found with id ${params.id} in ${table}`);
      return NextResponse.json({ error: `No ${type} found with ID ${params.id}` }, { status: 404 });
    }

    console.log(`PATCH success: updated ${data.length} rows`);
    return NextResponse.json(data[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const table = type === 'developer' ? 'developers' : 'projects';
    console.log(`DELETE submisson: id=${params.id}, table=${table}`);

    const { error, count } = await supabase
      .from(table)
      .delete({ count: 'exact' })
      .eq('id', params.id);

    if (error) {
      console.error(`DELETE error:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (count === 0) {
      console.error(`DELETE failed: No row found with id ${params.id} in ${table}`);
      return NextResponse.json({ error: `No ${type} found with ID ${params.id}` }, { status: 404 });
    }

    console.log(`DELETE success: removed ${count} rows`);
    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
