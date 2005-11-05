/**
 * =========================================================================
 * File        : FixedFunctionModelRenderer.h
 * Project     : Pyrogenesis
 * Description : ModelVertexRenderer that uses only fixed function pipeline
 *             : to render animated models.
 *
 * @author Nicolai Hähnle <nicolai@wildfiregames.com>
 * =========================================================================
 */

#ifndef FIXEDFUNCTIONMODELRENDERER_H
#define FIXEDFUNCTIONMODELRENDERER_H

#include "renderer/ModelVertexRenderer.h"

struct FixedFunctionModelRendererInternals;

/**
 * Class FixedFunctionModelRenderer: Render animated models using only
 * OpenGL fixed function.
 */
class FixedFunctionModelRenderer : public ModelVertexRenderer
{
public:
	FixedFunctionModelRenderer();
	~FixedFunctionModelRenderer();

	// Implementations
	void* CreateModelData(CModel* model);
	void UpdateModelData(CModel* model, void* data, u32 updateflags);
	void DestroyModelData(CModel* model, void* data);
	
	void BeginPass(uint streamflags);
	void EndPass(uint streamflags);
	void PrepareModelDef(uint streamflags, CModelDefPtr def);
	void RenderModel(uint streamflags, CModel* model, void* data);

private:
	FixedFunctionModelRendererInternals* m;
};


#endif // FIXEDFUNCTIONMODELRENDERER_H
